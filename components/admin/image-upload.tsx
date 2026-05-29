'use client';

import { supabase } from '@/lib/supabase/client';

export default function ImageUpload({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const fileName =
      `${Date.now()}-${file.name}`;

    const { error } =
      await supabase.storage
        .from('doctor-images')
        .upload(
          fileName,
          file,
        );

    if (error) {
      alert(error.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from('doctor-images')
      .getPublicUrl(
        fileName,
      );

    onUpload(publicUrl);
  }

  return (
    <div>
      <label className="mb-2 block text-sm text-slate-400">
        Doctor Photo
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
      />
    </div>
  );
}