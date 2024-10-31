import { useEffect, useState } from 'react'
import { axiosInstance, getAccessToken } from '@/utils/networking'
import { Card } from './types';

const API_ISSUING = process.env.EXPO_PUBLIC_API_ISSUING

const cardStatus = [ 'created', 'assigned', 'active', 'reserved', 'cancelled', 'blocked' ] as const

interface ICards {
	cards: Card[]
	totalCount: number
}

export default function useGetCards(entityId: string) {
	const [cards, setCards] = useState<ICards>({
		cards: [],
		totalCount: 0
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	const getCards = async () => {
		setLoading(true);
		try {
			const token = await getAccessToken();
			const url = `${API_ISSUING}/cards`
			const headers = {
				"X-User-Bearer": `Bearer ${token}`,
			}
			const cardsRequest = await axiosInstance({
				method: "GET",
				url,
				headers,
				params: {
					paymentMethodReference: entityId
				}
			});
			setCards(cardsRequest.data);
		} catch (err: any) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getCards();
	}, []);

	return {
		cards,
		loading,
		error,
		getCards
	};
}