from django.contrib.auth.decorators import user_passes_test

def only_superadmin(redirect):
    def superadmin_decorator(view_func):
        decorated_view_func = user_passes_test(lambda u: u.is_superuser, redirect, None)(view_func)
        return decorated_view_func
    
    return superadmin_decorator

def only_normal_user(redirect):
    def normal_user_decorator(view_func):
        decorated_view_func = user_passes_test(lambda u: not(u.is_superuser), redirect, None)(view_func)
        return decorated_view_func
    
    return normal_user_decorator