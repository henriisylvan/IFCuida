from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout


def login_view(request):
    urlRedirecionamento = request.GET.get('next') or request.POST.get('next')
    
    renderContexto = {
        'next': urlRedirecionamento,
    }

    if (request.user.is_authenticated):
        if (urlRedirecionamento is not None):
            return redirect(urlRedirecionamento)
                
        return redirect('../../adm/home' if (request.user.is_superuser) else '../../aluno/home')

    if (request.method == 'POST'):
        matricula = renderContexto['username'] = request.POST.get('user_login')
        senha = request.POST.get('user_password')

        usuario = authenticate(request, username = matricula, password = senha)
        
        try:
            if (usuario is not None):
                login(request, usuario)
                
                if (urlRedirecionamento is not None):
                    return redirect(urlRedirecionamento)
                
                return redirect('../../adm/home' if (usuario.is_superuser) else '../../aluno/home')
            else:
                renderContexto['erro'] = 'Nome de usuário ou senha inválidos.'
        except:
            renderContexto['erro'] = 'Ocorreu um erro, tente novamente.'

    return render(request, 'login.html', renderContexto)


def logout_view(request):
    logout(request)
    return redirect('login')