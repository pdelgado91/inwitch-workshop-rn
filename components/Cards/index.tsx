import { FlatList, Text } from "react-native";
import { styled } from "@gluestack-style/react"
import { Box, Spinner } from "@gluestack-ui/themed";
import useGetCards from "./useCards"
import CardItem from "../CardItem";

interface CardListProps {
	entityId: string;
}

const CardsList: React.FC<CardListProps> = ({ entityId }) => {
	const { cards, error, loading, getCards } = useGetCards(entityId);

	return <Box
		w={"$full"}
		h={"$full"}
	>
		<FlatList
			data={cards.cards}
			keyExtractor={(item) => item.cardIdentifier}
			renderItem={({ item }) => <CardItem {...item} handleReload={getCards} />}
			ListFooterComponent={<>
				{loading && <Spinner size={"small"} />}
			</>}
			ListHeaderComponent={<>
				<TextWrapper>
					Total de tarjetas: {cards.totalCount}
				</TextWrapper>
			</>}
			ListEmptyComponent={<>
				{error ?
					<ErrorText>Error obteniendo las tarjetas: {error.message}</ErrorText>
					:
					<TextWrapper mt={"$4"} textAlign="center">
						No hay tarjetas disponibles
					</TextWrapper>
				}
			</>}
		/>
	</Box>
}

const TextWrapper = styled(Text, {
	color: "$black",
	_dark: {
		color: "$white",
	}
})

const ErrorText = styled(TextWrapper, {
	fontSize: "$lg",
	color: "$red200",
	_dark: {
		color: "$red900",
	}
})

export default CardsList
