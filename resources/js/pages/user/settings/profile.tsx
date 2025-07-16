import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'プロフィール設定',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    email: string;
};

export default function Profile({ mustVerifyEmail, status, role, office }: { mustVerifyEmail: boolean; status?: string; role: string; office: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('user.profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="プロフィール設定" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="プロフィール情報" description="メールアドレスを更新できます" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="role">種別</Label>

                            <Input
                                id="role"
                                className="mt-1 block w-full"
                                value={role}
                                disabled
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">名前</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={auth.user.name}
                                disabled
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="kana">カナ</Label>

                            <Input
                                id="kana"
                                className="mt-1 block w-full"
                                value={auth.user.kana}
                                disabled
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">メールアドレス</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="office">所属事業所</Label>

                            <Input
                                id="office"
                                className="mt-1 block w-full"
                                value={office}
                                disabled
                            />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-sm text-muted-foreground">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('user.verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>保存</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">保存しました</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
