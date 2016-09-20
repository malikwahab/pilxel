from rest_framework import filters


class IsImageOwnerFilter(filters.BaseFilterBackend):
    """Get only objects belonging to the login user."""

    def filter_queryset(self, request, queryset, view):
        if request.user.is_authenticated():
            return queryset.filter(owner=request.user)


class IsFolderOwnerFilter(filters.BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        return queryset.filter(owner=request.user)
