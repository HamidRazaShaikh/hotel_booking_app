import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Create styles

const styles = StyleSheet.create({
  page: {
    borderColor: "black",
    borderWidth: 2,
  },

  container1: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: 2,
    borderBottomColor: 'black'
  },

  detailColumn: {
    flexDirection: "column",
    flexGrow: 9,
    textTransform: "uppercase",
  },

  info: {
    fontSize: 8,
    padding: 2,
    color: "blue",
  },

  name: {
    fontSize: 16,
    padding: 5,
  },

  email: {
    fontSize: 12,
    padding: 5,
  },
});

export function MyDocument(props) {
  let data = props.data;
  // console.log(data);
  return (
    <Document>
      <Page size="A6" style={styles.page}>
        {/* ******************* Header ************************* */}
        <View style={styles.container1}>
          <View style={styles.detailColumn}>
            <Text style={styles.name}> Delux Room booking </Text>
            <Text style={styles.info}>email : abd@gmail.com </Text>
            <Text style={styles.info}>phone : 032587456878</Text>
          </View>
        </View>
        <View style={styles.container1}>
          <View style={styles.detailColumn}>
            <Text style={styles.email}>Room : {data?.name} </Text>
            <Text style={styles.email}>Category : {data?.category} </Text>
            <Text style={styles.email}>roomID : {data?.roomID} </Text>
            <Text style={styles.email}>Capacity : {data?.capacity} </Text>
            <Text style={styles.email}>From : {data?.From_date} </Text>
            <Text style={styles.email}>To : {data?.To_date} </Text>
            <Text style={styles.email}>Duration: {data?.Duration} </Text>
            <Text style={styles.email}>Amount : {data?.Amount} </Text>
            <Text style={styles.email}>Name : {data?.Name} </Text>
            <Text style={styles.email}>email : {data?.userEmail} </Text>
            <Text style={styles.email}>Address: {data?.Address} </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
