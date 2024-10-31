import { SafeAreaView } from "react-native-safe-area-context";
import {styled} from "@gluestack-style/react"

export const SafeAreaViewWrapper = styled(SafeAreaView, {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-start",
	alignItems: "center",
	p: "$5",
})