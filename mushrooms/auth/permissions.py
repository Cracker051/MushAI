from auth.dependecies import UserPermission

req_active_user = UserPermission(is_active=True)
req_verified_user = UserPermission(is_verified=True)
req_staff_user = UserPermission(is_staff=True)
req_regular_user = UserPermission.from_permissions(req_active_user, req_verified_user)
