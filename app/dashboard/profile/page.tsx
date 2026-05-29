'use client';

import { PageHeader } from '@/components/shared/page-header';
import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase/client';
import { updateProfile } from '@/lib/actions/profile-update';

import AvatarUpload from '@/components/dashboard/avatar-upload';

export default function ProfilePage() {
  const [userId, setUserId] =
    useState('');

  const [avatarUrl, setAvatarUrl] =
    useState('');

  const [fullName, setFullName] =
    useState('');

  const [phone, setPhone] =
    useState('');

  const [age, setAge] =
    useState('');

  const [bloodGroup, setBloodGroup] =
    useState('');

  const [emergencyContact, setEmergencyContact] =
    useState('');

  const [address, setAddress] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data } =
        await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

      if (data) {
        setAvatarUrl(
          data.avatar_url || '',
        );

        setFullName(
          data.full_name || '',
        );

        setPhone(
          data.phone || '',
        );

        setAge(
          data.age?.toString() ||
            '',
        );

        setBloodGroup(
          data.blood_group || '',
        );

        setEmergencyContact(
          data.emergency_contact ||
            '',
        );

        setAddress(
          data.address || '',
        );
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  async function saveProfile() {
    const result =
      await updateProfile(
        userId,
        {
          full_name: fullName,
          phone,
          age: age
            ? Number(age)
            : null,
          blood_group:
            bloodGroup,
          emergency_contact:
            emergencyContact,
          address,
        },
      );

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert(
      'Profile Updated Successfully',
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] p-8 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] p-8 text-white">
      <PageHeader
        homeHref="/dashboard"
        homeLabel="Patient Dashboard"
        title="My Profile"
        breadcrumb="Patient Dashboard > My Profile"
      />

      <div className="mt-10 max-w-4xl rounded-[32px] border border-white/10 bg-white/5 p-8">
        <div className="mb-8 flex flex-col items-center gap-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-cyan-400"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-cyan-400 text-5xl font-black text-black">
              {fullName?.charAt(0) ||
                'P'}
            </div>
          )}

          {userId && (
            <AvatarUpload
              userId={userId}
            />
          )}
        </div>

        <div className="space-y-6">
          <input
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value,
              )
            }
            placeholder="Full Name"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
          />

          <input
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value,
              )
            }
            placeholder="Phone Number"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
          />

          <input
            value={age}
            onChange={(e) =>
              setAge(
                e.target.value,
              )
            }
            placeholder="Age"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
          />

          <input
            value={bloodGroup}
            onChange={(e) =>
              setBloodGroup(
                e.target.value,
              )
            }
            placeholder="Blood Group"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
          />

          <input
            value={
              emergencyContact
            }
            onChange={(e) =>
              setEmergencyContact(
                e.target.value,
              )
            }
            placeholder="Emergency Contact"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
          />

          <textarea
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value,
              )
            }
            placeholder="Address"
            rows={4}
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
          />

          <button
            onClick={saveProfile}
            className="rounded-full bg-cyan-400 px-8 py-4 font-black text-black"
          >
            Save Profile
          </button>
        </div>
      </div>
    </main>
  );
}