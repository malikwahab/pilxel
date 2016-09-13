import mock

from django.core.files import File
from PIL import Image
from io import BytesIO
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from pilxel.api import ImageViewSet, FolderViewSet, ImageDetailsViewSet, ManipulateImage, Enhancement, FilterImage
from pilxel.api import Image as PilxelImage


class BaseTestCase(APITestCase):

    def setUp(self):
        self.user = {"username": "malikwahab", "password1": "malikwahab", "password2": "malikwahab"}
        # login the user, session authentication is allowed
        response = self.client.post('/api/v1/auth/register/', self.user, format="json")

    def tearDown(self):
        User.objects.all().delete()

    @staticmethod
    def get_image_file(name):
        image = BytesIO()
        image_obj = Image.new("RGBA", size=(50, 50), color=(255, 0, 0, 1))
        image_obj.save(image, "png")
        image.seek(0)
        return File(image, name=name)

    def create_image(self, name="testimg.png"):
        image = TestImageAPI.get_image_file(name=name)
        data = {"name": name, "image": image}
        response = self.client.post("/api/v1/images/", data)
        return response

class TestImageAPI(BaseTestCase):

    def setUp(self):
        self.url = "/api/v1/images/"
        super(TestImageAPI, self).setUp()

    def test_create_image(self):
        # test successful image upload
        response = self.create_image()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # test invalid post request
        response = self.client.post(self.url, {'name': "untitled"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_image(self):
        create_response = self.create_image()
        image_id = create_response.data.get("id")

        # test getting all images
        all_repsonse = self.client.get(self.url)
        self.assertEqual(all_repsonse.status_code, status.HTTP_200_OK)

        # test getting a single image
        single_response = self.client.get(self.url+"{}/".format(image_id))
        self.assertEqual(single_response.status_code, status.HTTP_200_OK)

        # test getting an invalid image
        invalid_response = self.client.get(self.url+"{}/".format(100))
        self.assertEqual(invalid_response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch.object(ManipulateImage, "manipulate", autospec=True)
    @mock.patch("pilxel.api.Image")
    def test_manipulate_image(self, mock_image, mock_manipulate):
        create_response = self.create_image()
        image_id = create_response.data.get("id")

        data = {
            "manipulate": {
                "crop": {
                    "left": 0,
                    "upper": 0,
                    "right": 30,
                    "lower": 30
                }
            }
        }
        response = self.client.put(self.url+"{}/".format(image_id), data, format="json")

        # test for successful call
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(mock_image.open.called)

        # test if manipulate was called
        self.assertTrue(mock_manipulate.called)

    @mock.patch.object(Enhancement, "enhance", autospec=True)
    @mock.patch("pilxel.api.Image")
    def test_enhance_image(self, mock_image, mock_enhance):
        create_response = self.create_image()
        image_id = create_response.data.get("id")

        data = {
            "enhance": {
                "brightness": 0.7
            }
        }

        response = self.client.put(self.url+"{}/".format(image_id), data, format="json")

        # test for successful call
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # test if Image module was called
        self.assertTrue(mock_image.open.called)

        # test if enhance was called
        self.assertTrue(mock_enhance.called)

    @mock.patch.object(FilterImage, "filter", autospec=True)
    @mock.patch("pilxel.api.Image")
    def test_filter_image(self, mock_image, mock_filter):
        create_response = self.create_image()
        image_id = create_response.data.get("id")

        data = {
            "filter": "blur"
        }

        response = self.client.put(self.url+"{}/".format(image_id), data, format="json")

        # test for successful call
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # test if Image module was called
        self.assertTrue(mock_image.open.called)

        # test if enhance was called
        self.assertTrue(mock_filter.called)

    def test_save_image(self):
        create_response = self.create_image()
        image_id = create_response.data.get("id")

        data = {
            "filter": "blur",
            "save": 1
        }

        response = self.client.put(self.url+"{}/".format(image_id), data, format="json")

        # test for successful call
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_image(self):
        create_response = self.create_image()
        image_id = create_response.data.get("id")
        image_url = self.url+"{}/".format(image_id)

        response = self.client.delete(image_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # assert image canot be found
        get_response = self.client.get(image_url)
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_invalid_edit_request(self):
        create_response = self.create_image()
        image_id = create_response.data.get("id")

        data = {
            "invalid": "blur",
        }
        response = self.client.put(self.url+"{}/".format(image_id), data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_access_other_users_images(self):
        create_response = self.create_image()
        image_id = create_response.data.get("id")
        image_url = self.url+"{}/".format(image_id)
        self.client.get("/api/v1/rest-auth/logout/")

        user = {"username": "adeyiwahab", "password1": "adeyiwahab", "password2": "adeyiwahab"}
        resgister_response = self.client.post('/api/v1/auth/register/', user, format="json")

        put_response = self.client.put(image_url, {"filer", "blur"}, format="json")
        delete_response = self.client.delete(image_url)

        # assert put forbiden
        self.assertEqual(put_response.status_code, status.HTTP_403_FORBIDDEN)

        # assert delete forbiden
        self.assertEqual(delete_response.status_code, status.HTTP_404_NOT_FOUND)



    def test_unauthorize_access(self):
        create_response = self.create_image()
        image_id = create_response.data.get("id")
        image_url = self.url+"{}/".format(image_id)

        # logout of session
        self.client.get("/api/v1/rest-auth/logout/")
        unauthorize_get = self.client.get(self.url)
        unauthorize_post = self.client.post(self.url, {})
        unauthorize_put = self.client.put(image_url, {"filer", "blur"}, format="json")
        unauthorize_delete = self.client.delete(image_url)

        # assert get allowed
        self.assertEqual(unauthorize_get.status_code, status.HTTP_200_OK)

        # assert post forbiden
        self.assertEqual(unauthorize_post.status_code, status.HTTP_403_FORBIDDEN)

        # assert put forbiden
        self.assertEqual(unauthorize_put.status_code, status.HTTP_403_FORBIDDEN)

        # assert delete forbiden
        self.assertEqual(unauthorize_delete.status_code, status.HTTP_403_FORBIDDEN)



class TestImageDetailsAPI(BaseTestCase):

    def setUp(self):
        self.url = "/api/v1/image-details/"
        super(TestImageDetailsAPI, self).setUp()

    def test_get_image_details(self):
        create_response = self.create_image()
        image_id = create_response.data.get("id")
        response = self.client.get(self.url+"{}/".format(image_id))

        # assert successful request
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # test data returned
        self.assertIn("name", response.data)

    def test_allow_only_detail_view(self):
        create_response = self.create_image()
        image_id = create_response.data.get("id")
        post_response = self.client.post(self.url+"{}/".format(image_id), {})
        put_response = self.client.put(self.url+"{}/".format(image_id), {})
        self.assertEquals(post_response.status_code, put_response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


class TestFolderAPI(BaseTestCase):

    def setUp(self):
        self.url = "/api/v1/folders/"
        super(TestFolderAPI, self).setUp()

    def create_folder(self):
        data = {"name": "test_folder"}
        response = self.client.post(self.url, data)
        return response

    def test_create_folder(self):
        response = self.create_folder()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # test invalid data
        invalid_response = self.client.post(self.url, {})
        self.assertEqual(invalid_response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_folder(self):
        create_response = self.create_folder()
        folder_id = create_response.data.get("id")

        response = self.client.get(self.url+"{}/".format(folder_id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("name", response.data)

        # test inva;id get
        invalid_response = self.client.get(self.url+"100/")
        self.assertEqual(invalid_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_add_image_to_folder(self):
        create_response = self.create_folder()
        folder_id = create_response.data.get("id")

        image = TestImageAPI.get_image_file("test_image")
        data = {
            "name": "testimage",
            "image": image,
            "folder": folder_id
        }
        image_response = self.client.post("/api/v1/images/", data)
        image_id = image_response.data.get("id")

        # test image was added to folder
        response = self.client.get(self.url+"{}/".format(folder_id))
        folder_images = response.data.get("images")
        self.assertEqual(folder_images[0].get('id'), image_id)

        # test folder delete
        delete_response = self.client.delete(self.url+"{}/".format(folder_id))
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)

        # image deleted
        deleted_image_response = self.client.get("/api/v1/images/{}/".format(image_id))
        self.assertEqual(deleted_image_response.status_code, status.HTTP_404_NOT_FOUND)
