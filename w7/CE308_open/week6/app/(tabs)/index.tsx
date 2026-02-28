import { View, Text, Pressable, FlatList } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const products = [
  {
    id: "1",
    name: "Premium Coffee Bean",
    price: 450,
    description: "High quality arabica coffee bean",
  },
  {
    id: "2",
    name: "Green Tea Powder",
    price: 290,
    description: "Organic matcha powder",
  },
  {
    id: "3",
    name: "Oat Milk 1L",
    price: 115,
    description: "Plant-based oat milk",
  },
];

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f3f4f6" }}>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/details",
                params: {
                  name: item.name,
                  price: item.price,
                  description: item.description,
                },
              })
            }
            style={{
              backgroundColor: "#fff",
              padding: 16,
              borderRadius: 12,
              marginBottom: 16,
              elevation: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* ฝั่งซ้าย */}
            <View>
              <Text style={{ fontWeight: "600" }}>{item.name}</Text>
              <Text style={{ color: "orange", marginTop: 4 }}>
                ฿{item.price}
              </Text>
            </View>

            {/* Chevron ขวา */}
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#9CA3AF"
            />
          </Pressable>
        )}
      />
    </View>
  );
}