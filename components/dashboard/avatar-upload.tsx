'use client';

import { supabase } from '@/lib/supabase/client';

export default function AvatarUpload({
  userId,
}: {
  userId: string;
}) {
  async function uploadAvatar(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const fileName =
      `${userId}-${Date.now()}`;

    const { error } =
      await supabase.storage
        .from('avatars')
        .upload(
          fileName,
          file,
          {
            upsert: true,
          },
        );

    if (error) {
      alert(error.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from('avatars')
      .getPublicUrl(
        fileName,
      );

    await supabase
      .from('profiles')
      .update({
        avatar_url:
          publicUrl,
      })
      .eq('id', userId);

    alert(
      'Profile Photo Updated',
    );

    window.location.reload();
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={
        uploadAvatar
      }
      className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
    />
  );
}