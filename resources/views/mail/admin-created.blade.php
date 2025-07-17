<x-mail::message>
# {{ $admin->name }} 様

{{ config('app.name') }} の管理者に登録されました

ログインメールアドレスと初期パスワードは次のとおりです

ログインメールアドレス<br>
{{ $admin->email }}

初期パスワード<br>
{{ $password }}

ログイン後、ユーザー設定のページでパスワードを変更してください

次のボタンからログイン画面にアクセスすることができます

<x-mail::button :url="config('app.url') . '/admin/login'">
ログイン
</x-mail::button>

もしボタンがクリックできない場合には次のURLをクリックしてログイン画面にアクセスしてください<br>
<a href="{{ config('app.url') . '/admin/login' }}">{{ config('app.url') . '/admin/login' }}</a>
</x-mail::message>
