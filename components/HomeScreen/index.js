import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { Title } from "react-native-paper";
import Item from "./Item";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const MIN_HEIGHT = 50;
const MAX_HEIGHT = Dimensions.get("window").height * 0.55;

const Home = () => {
  // const [snapPoint, setSnapPoint] = useState(MIN_HEIGHT);
  // const [touchStart, setTouchStart] = useState(10);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [MIN_HEIGHT, MAX_HEIGHT], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const CLONE = [
    {
      id: 1,
      name: "Item 1",
      address: "229 Andrew Dr Manning, South Carolina(SC), 29102",
      status: 0,
    },
    {
      id: 2,
      name: "Item 2",
      address: "229 Andrew Dr Manning, South Carolina(SC), 29102",
      status: 1,
    },
    {
      id: 3,
      name: "Item 3",
      address: "229 Andrew Dr Manning, South Carolina(SC), 29102",
      status: 2,
    },
  ];

  const renderItem = useCallback(({ item }) => <Item {...item} />, []);

  // renders
  return (
    <View style={styles.container}>
      {/* <View
        style={{
          ...styles.contentContainer,
          top: snapPoint,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: (MAX_HEIGHT / 0.45) * 0.55,
        }}
      >
        <View
          onTouchStart={(e) =>
            setTouchStart(Math.abs(snapPoint - e.nativeEvent.pageY))
          }
          onTouchMove={(e) => {
            const scrollY = e.nativeEvent.pageY - touchStart;
            if (scrollY > MIN_HEIGHT) setSnapPoint(MIN_HEIGHT);
            else if (scrollY < MAX_HEIGHT) setSnapPoint(MAX_HEIGHT);
            else setSnapPoint(scrollY);
          }}
        >
          <View
            style={{
              padding: 10,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#ACACAC",
                height: 3,
                width: 70,
                borderRadius: 3,
              }}
            ></View>
          </View>
        </View>
        <View style={{ alignItems: "center", padding: 4 }}>
          <Title>List Items</Title>
        </View>
        <FlatList
          data={CLONE}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Item {...item} />}
        />
      </View> */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView>
          <View style={{ alignItems: "center", padding: 4 }}>
            <Title>List Items</Title>
          </View>
          <BottomSheetFlatList
            // ref={}
            data={CLONE}
            keyExtractor={(i) => i.id}
            renderItem={renderItem}
          />
          {/* <FlatList
            data={CLONE}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Item {...item} />}
          /> */}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   // padding: 24,
  //   backgroundColor: "grey",
  //   // height: "100%",
  // },
  // contentContainer: {
  //   // flex: 1,
  //   // alignItems: "center",
  //   position: "absolute",
  //   backgroundColor: "white",
  //   width: "100%",
  //   // height: 100,
  // },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default Home;
