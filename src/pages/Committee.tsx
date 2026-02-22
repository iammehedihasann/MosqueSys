import { SectionTitle } from '../components/SectionTitle'
import { ProfileCard } from '../components/ProfileCard'
import committeeData from '../data/committee.json'
import type { CommitteeMember } from '../types'

export function Committee() {
  const members = committeeData.members as CommitteeMember[]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionTitle
        title="পরিচালনা কমিটি / Management Committee"
        subtitle="মসজিদের সার্বিক পরিচালনা ও সিদ্ধান্তে এই কমিটি দায়িত্বপ্রাপ্ত। সভাপতি ও সাধারণ সম্পাদক সহ সকল সদস্যের সাথে যোগাযোগের নম্বর দেওয়া আছে।"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <ProfileCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}
