import React from "react";
import { 
  StyleSheet, 
  ScrollView,
  Text,
  View,
  FlatList 
} from "react-native";


const LIKE = [
  { id : '1', title: 'ดูข่าวทุกประเภท'},
  { id : '2', title: 'เล่นเกม turn-based'},
  { id : '3', title: 'Tactical '},
  { id : '4', title: 'กินข้าว, ของหวาน'},
  { id : '5', title: 'ดูหนัง, Anime'},
  { id : '6', title: 'ฟังเพลง'},
];

const DISLIKE = [
  { id : '1', title: 'ป่วย'},
  { id : '2', title: 'อะไรที่ทำให้ลายตา'},
  { id : '3', title: 'ยุง'},
  { id : '4', title: 'สิ่งที่ทำให้ไม่ปลอดภัย'},
];

const PROFILE = [
  { id : '1', title: 'ชื่อ: สุพจน์ ชูจงกล'},
  { id : '2', title: 'ชื่อเล่น: แบงค์'},
  { id : '3', title: 'Email: 66111105@dpu.ac.th'},  
];

const EDUCATION = [
  { id : '1', title: 'ประถมศึกษา: โรงเรียนวัดจันทรสโมสร'},
  { id : '2', title: 'มัธยมศึกษาตอนต้น: โรงเรียนโยธินบูรณะ'},
  { id : '3', title: 'มัธยมศึกษาตอนปลาย: โรงเรียนโยธินบูรณะ'},
  { id : '4', title: 'ปริญญาตรี: สาขาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยธุรกิจบัณฑิตย์'},
];

const ADDRESS = [
  { id : '1', title: '1156/780 ถ.สามเสน แขวงถนนนครไชยศรี เขตดุสิต กรุงเทพฯ 10300'},
];

// สร้างคอมโพเนนต์หลักของแอป ภายใน ScrollView
const App = () => {

  const renderItem_green = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.itemContainer}>
      <View style={styles.dot_green}/>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  const renderItem_red = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.itemContainer}>
      <View style={styles.dot_red}/>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  return(
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text> 
      </View>

      <View style={styles.row}>
        <View style={[styles.box, {backgroundColor: "#9B7EBD"}]}>
          <Text style={styles.boxText}>{"ID Student\n66111105"}</Text>
        </View>
        <View style={[styles.box, {backgroundColor: "#740A03"}]}>
          <Text style={styles.boxText}>CITE</Text>
        </View>
        <View style={[styles.box, {backgroundColor: "#002455"}]}>
          <Text style={styles.boxText}>CE</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>Profile:</Text>
          {PROFILE.map(item => (
            <View key={item.id} style={styles.listItem}>
              <Text>{item.title}</Text>
            </View>
          ))}
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>EDUCATION:</Text>
          {EDUCATION.map(item => (
            <View key={item.id} style={styles.listItem}>
              <Text>{item.title}</Text>
            </View>
          ))}
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>ADDRESS:</Text>
          {ADDRESS.map(item => (
            <View key={item.id} style={styles.listItem}>
              <Text>{item.title}</Text>
            </View>
          ))}
      </View>

      <View style={styles.contentSection}>
        <FlatList
          data={LIKE}
          renderItem={renderItem_green}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Text style={styles.headerFlatlist_green}>LOVE IT</Text>}
        />
      </View>

      <View style={styles.contentSection}>
        <FlatList
          data={DISLIKE}
          renderItem={renderItem_red}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Text style={styles.headerFlatlist_red}>DON'T LIKE IT</Text>}
        />
      </View>

    </ScrollView>
  );
};


//ใช้สไตล์ชีทในการตกแต่ง 
const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    backgroundColor: "#EEEEEE",
  },
  header: {
    height: 100,
    backgroundColor: "#547792",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    flex: 1,
    height: 100,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  boxText: {
    color: "#fff",
    fontWeight: "600",
  },
  contentSection:{
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: '#D2C1B6',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 10,
    borderLeftColor: '#456882',
  },
  contentSectionFlatlist:{
    marginTop: 20,
  },
  headerFlatlist_green:{
    fontSize: 24,
    fontWeight: "bold",
    color: "#DCDCDC",
    padding: 20,
    backgroundColor: "#67C090",
    borderRadius: 15,
  },
  headerFlatlist_red:{
    fontSize: 24,
    fontWeight: "bold",
    color: "#DCDCDC",
    padding: 20,
    backgroundColor: "#D34E4E",
    borderRadius: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 4.5,
    borderBottomColor: '#CCCCCC',
  },
  dot_green: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#67C090',
    marginRight: 10,
  },
  dot_red: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#D34E4E',
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default App;
