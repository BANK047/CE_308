import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../redux/cartSlice";
import { useState } from "react";
import { RootState, AppDispatch } from "../redux/store";

const CartScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");

  const handleAdd = () => {
    if (!name || !price || !qty) {
      alert("Please fill in all fields");
      return;
    }
    dispatch(addItem({
      id: Date.now().toString(),
      name,
      price: Number(price),
      quantity: Number(qty),
    }));
  };
  const handleClear = () => {
    dispatch(clearCart());
    setName("");
    setPrice("");
    setQty("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="ชื่อสินค้า"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="ราคา"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="จำนวน"
        value={qty}
        onChangeText={setQty}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title="เพิ่มลงตะกร้า" onPress={handleAdd} />

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} x{item.quantity} ราคาต่อจำนวน {item.price} บาท</Text>
            <Button title="ลบ" onPress={() => dispatch(removeItem(item.id))} />
          </View>
        )}
      />

      <Text style={styles.total}>ยอดรวม: {totalAmount} บาท</Text>

      <Button title="ล้างตะกร้า" onPress={handleClear} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 2, marginBottom: 10, padding: 8, color: "gray" },
  item: { flexDirection: "row", justifyContent: "space-between", marginVertical: 5},
  total: { fontSize: 14, marginTop: 10 },
});

export default CartScreen;
