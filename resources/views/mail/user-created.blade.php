<x-mail::message>
# {{ $user->name }} 様

{{ config('app.name') }} のユーザーに登録されました

ログインメールアドレスと初期パスワードは次のとおりです

ログインメールアドレス<br>
{{ $user->email }}

初期パスワード<br>
{{ $password }}

ログイン後、ユーザー設定のページでパスワードを変更してください

次のボタンからログイン画面にアクセスすることができます

<x-mail::button :url="config('app.url') . '/login'">
ログイン
</x-mail::button>

もしボタンがクリックできない場合には次のURLをクリックしてログイン画面にアクセスしてください<br>
<a href="{{ config('app.url') . '/login' }}">{{ config('app.url') . '/login' }}</a>
</x-mail::message>
