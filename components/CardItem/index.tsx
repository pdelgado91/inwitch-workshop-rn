import React from "react"
import { Dimensions, Text, View } from "react-native"
import { styled } from "@gluestack-style/react"
import { Box, EyeIcon, EyeOffIcon, HStack, Icon, Pressable, Switch } from "@gluestack-ui/themed"
import type { Card } from "../Cards/types"
import useCardItem, { CARD_ICONS } from "./useCardItem"
import type { TCardIcons } from "./useCardItem"

type TCardIconPool = {
	[x in TCardIcons]: any
}

interface CardItemProps extends Card {
	handleReload: () => void
}

const { width } = Dimensions.get("window")

const CARD_WIDTH = width * 0.8
const CARD_HEIGHT = CARD_WIDTH * 0.4

const icons: TCardIconPool = {
	watch: EyeIcon,
	unwatch: EyeOffIcon
}

const CardItem: React.FC<CardItemProps> = ({handleReload,...props}) => {
	const {
		handleActiveCard,
		error,
		loading,
		modeWatched,
		handleWatched
	} = useCardItem();

	return (
		<Box mt={"$8"}>
			<HStack justifyContent="space-between" alignItems="center">
				<WrappedText fontWeight={"$bold"} color="$black" $dark-color="$white">
					{props.status !== 'active' ? "Activar" : "Desactivar"} tarjeta
				</WrappedText>
				<Switch
					size="md"
					value={props.status==='active'}
					onChange={() => handleActiveCard(
						props.status === 'active' ? 'block' : 'unblock',
						props.cardIdentifier,
						handleReload
					)}
				/>
			</HStack>
			<CardWrapper>
				<HStack
					justifyContent="space-between"
					alignItems="center"
				>
					<WrappedText fontWeight={"$thin"}>
						{props.maskedPan}
						<WrappedText fontWeight={"$bold"}>
							{` ${props.currency}`}
						</WrappedText>
					</WrappedText>
					<Pressable
						onPress={handleWatched}
						p={"$2"}
					>
						<Icon
							as={icons[modeWatched]}
							color="$black"
							size="xl"
						/>
					</Pressable>
				</HStack>
				<HStack justifyContent="flex-start" alignItems="center" mt={"$4"}>
					<WrappedText fontWeight={"$bold"}>
						Estado: <WrappedText fontWeight={"$thin"}>{props.status}</WrappedText>
					</WrappedText>
					<StatusIndicator
						status={props.status as "active" | "blocked"}
					/>
				</HStack>
			</CardWrapper>
		</Box>
	)
}

const CardWrapper = styled(View, {
	backgroundColor: "$lightBlue50",
	rounded: "$xl",
	width: CARD_WIDTH,
	height: CARD_HEIGHT,
	alignSelf: "center",
	mt: "$7",
	p: "$4",
});

const StatusIndicator = styled(View, {
	ml: "$2",
	rounded: "$full",
	width: "$4",
	height: "$4",
	bg: "$warmGray400",
	mr: "$2",
	variants: {
		status: {
			active: {
				bg: "$green500"
			},
			blocked: {
				bg: "$red500"
			}
		}
	}
})

const WrappedText = styled(Text, {
	color: "$black",
	fontSize: "$lg",
})

export default CardItem
