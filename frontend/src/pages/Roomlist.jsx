import { Room } from './../components/Roomlist/Room'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authFetch } from '../api/authFetch'
import { useAuth } from '../auth/AuthContext'
import Mascot from '../components/ui/Mascot'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'
import PrimaryButton from '../components/ui/PrimaryButton'
import SecondaryButton from '../components/ui/SecondaryButton'

export function RoomList ({rooms, setRooms}) {
    const { t } = useTranslation()
    const { userId } = useAuth()
    const [matchToDelete, setMatchToDelete] = useState(null)

    const handleUnmatch = async () => {
        try {
            await authFetch(`/api/matches/${matchToDelete.id}`, { method: 'PATCH' })
            setRooms(rooms.filter(r => r.id !== matchToDelete.id))
        } catch (e) {
            console.error(e)
        }
        setMatchToDelete(null)
    }

    const monChien = (match) => (
            match.matchesAsDog1.owner_id === userId ? match.matchesAsDog1.dog_name : match.matchesAsDog2.dog_name
    )
    const userDogName = rooms.length > 0 ? monChien(rooms[0]) : '';

    let list = (
        <div className="flex flex-col items-center gap-3 p-8 text-text-caption">
            <Mascot index={1} size="md" />
            <p className="text-sm">{t('NoMatches')}</p>
        </div>
    )
    if (rooms && rooms.length > 0) {
        list = rooms.map(c => {
        const matchDogName = c.matchesAsDog1.owner_id === userId ? c.matchesAsDog2.dog_name : c.matchesAsDog1.dog_name;
        return (
            <div key={c.id} className="relative">
                <Link to={`/chat/${c.id}`}>
                    <Room match_dog_name={matchDogName} />
                </Link>
                <button
                    onClick={(e) => { e.preventDefault(); setMatchToDelete({ id: c.id, name: matchDogName }) }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary hover:bg-primary-hover text-surface-white text-xs flex items-center justify-center transition z-10"
                >
                    ✕
                </button>
            </div>
        )
        });
    }
    return (
        <>
        {matchToDelete && (
            <Modal onClose={() => setMatchToDelete(null)} width="w-full mx-4 sm:w-96">
                <ModalHeader title={t('UnmatchConfirmTitle')} />
                <p className="text-text-caption text-sm text-center">
                    {t('UnmatchConfirmText', { name: matchToDelete.name })}
                </p>
                <div className="flex gap-3 w-full mt-2">
                    <SecondaryButton onClick={() => setMatchToDelete(null)}>{t('Cancel')}</SecondaryButton>
                    <PrimaryButton onClick={handleUnmatch}>{t('Confirm')}</PrimaryButton>
                </div>
            </Modal>
        )}
        <div className="border-r w-full overflow-y-auto bg-surface-cream p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-text-primary font-heading">
                    {t('RoomList1')} {userDogName}
                </h1>
                <p className="mt-2 text-sm text-text-caption">
                    {t('RoomList2')}
                </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-surface-alt bg-surface-white shadow-soft">
                <div className="divide-y divide-surface-alt">
                    {list}
                </div>
            </div>

        </div>
        </>
        );
    }
    