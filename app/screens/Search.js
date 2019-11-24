import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Search extends Component {
	render() {
		return (
			<View styles={styles.viewBody}>
				<Text>Search screen...</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
