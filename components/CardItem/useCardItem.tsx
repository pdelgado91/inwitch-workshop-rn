import { useState } from 'react';
import { axiosInstance, getAccessToken } from '@/utils/networking'
import { Toast, ToastDescription, ToastTitle, useToast, VStack } from '@gluestack-ui/themed';

export const CARD_ICONS = ['watch','unwatch'] as const
export const MODE = ['block','unblock'] as const

type TMode = typeof MODE[number]

export type TCardIcons = typeof CARD_ICONS[number]

type TModalText = {
	title: string,
	description: string,
}

type TModalStrings = {
	[x in TMode]: TModalText
}

type THandleActiveCard = (mode: TMode, cardIdentifier: string, callback?: () => void) => void

const API_ISSUING = process.env.EXPO_PUBLIC_API_ISSUING

const modalStrings: TModalStrings = {
	block: {
		title: "Tarjeta bloqueada",
		description: "La tarjeta ha sido bloqueada correctamente"
	},
	unblock: {
		title: "Tarjeta desbloqueada",
		description: "La tarjeta ha sido desbloqueada correctamente"
	}
}

export default function useCardItem() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [modeWatched, setModeWatched] = useState<TCardIcons>(CARD_ICONS[1])
	const toast = useToast();

	const handleActiveCard:THandleActiveCard = async (mode="block",cardIdentifier,callback) => {
		setLoading(true);
		try {
			const token = await getAccessToken();
			const url = [`${API_ISSUING}`,"cards", `cardId%40${cardIdentifier}`]
			if(mode === 'block') {
				url.push('blockCard')
			} else {
				url.push('unblockCard')
			}
			const headers = {
				"X-User-Bearer": `Bearer ${token}`,
			}
			await axiosInstance({
				method: "PUT",
				url: url.join('/'),
				headers,
			});
			successToast(mode);
			callback && callback();
		} catch (err: any) {
			setError(err);
			toast.show({
				placement: "bottom",
				render: ({ id }) => {
					const toastId = "toast-" + id
					const action = modalStrings[mode]
					return (
						<Toast nativeID={toastId} action={'error'}>
							<VStack w={"$full"}>
								<ToastTitle>Error</ToastTitle>
								<ToastDescription>
									Ocurrió un error al intentar {mode === 'block' ? 'bloquear' : 'desbloquear'} la tarjeta
								</ToastDescription>
							</VStack>
						</Toast>
					)
				},
			})
		} finally {
			setLoading(false);
		}
	}

	const successToast = (mode: TMode) => toast.show({
		placement: "bottom",
		render: ({ id }) => {
			const toastId = "toast-" + id
			const action = modalStrings[mode]
			return (
				<Toast nativeID={toastId} action={'info'}>
					<VStack space="xs" flex={1}>
						<ToastTitle>{action.title}</ToastTitle>
						<ToastDescription>
							{action.description}
						</ToastDescription>
					</VStack>
				</Toast>
			)
		},
	})

	const handleWatched = () => setModeWatched(modeWatched === 'watch' ? CARD_ICONS[1] : CARD_ICONS[0])

	return {
		loading,
		handleActiveCard,
		error,
		modeWatched,
		handleWatched
	};
}