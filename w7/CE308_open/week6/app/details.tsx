import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen() {
  const { name, price, description } = useLocalSearchParams<{
    name: string;
    price: string;
    description: string;
  }>();

  return (
    <View style={styles.container}>
      {/* กล่องรูปภาพจำลอง */}
      <View style={styles.imageBox}>
        <Text style={{ color: "#9CA3AF" }}>Product Image</Text>
      </View>

      {/* ข้อมูลสินค้า */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>฿{price}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  imageBox: {
    height: 180,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    color: "orange",
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
});