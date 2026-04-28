import Navbar from "../../../components/Navbar";
import ClubHeader from "../../../components/ClubHeader";
import ClubStatsGrid from "../../../components/ClubStatsGrid";
import FormTracker from "../../../components/FormTracker";
import SquadTable from "../../../components/SquadTable";
import { mockClub } from "../../../lib/mockData";

export default function ClubPage({
  params,
}: {
  params: { clubId: string };
}) {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
        <p className="text-sm text-gray-500">Club ID: {params.clubId}</p>

        <ClubHeader
          name={mockClub.name}
          platform={mockClub.platform}
          division={mockClub.division}
          skillRating={mockClub.skillRating}
        />

        <ClubStatsGrid
          wins={mockClub.record.wins}
          draws={mockClub.record.draws}
          losses={mockClub.record.losses}
          goalsFor={mockClub.goalsFor}
          goalsAgainst={mockClub.goalsAgainst}
          cleanSheets={mockClub.cleanSheets}
        />

        <FormTracker form={mockClub.recentForm} />

        <SquadTable players={mockClub.squad} />
      </section>
    </main>
  );
}