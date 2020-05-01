import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, FlatList, Image, AsyncStorage} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Divider } from 'react-native-elements';
import moment from "moment";

// temporary data until we pull from Firebase
posts = [
  {
      id: "1",
      name: "Joe McKay",
      text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timestamp: 1569109273726,
      avatar: require("../assets/3-tony.jpg"),
      image: require("../assets/3-tony.jpg")
  },
  {
      id: "2",
      name: "Karyn Kim",
      text:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      timestamp: 1569109273726,
      avatar: require("../assets/3-tony.jpg"),
      image: require("../assets/3-tony.jpg")
  },
  {
      id: "3",
      name: "Emerson Parsons",
      text:
          "Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.",
      timestamp: 1569109273726,
      avatar: require("../assets/3-tony.jpg"),
      image: require("../assets/3-tony.jpg")
  },
  {
      id: "4",
      name: "Kathie Malone",
      text:
          "At varius vel pharetra vel turpis nunc eget lorem. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Adipiscing tristique risus nec feugiat in fermentum.",
      timestamp: 1569109273726,
      avatar: require("../assets/3-tony.jpg"),
      image: require("../assets/3-tony.jpg")
  }
];

export default class Browse01 extends Component {

  renderPost = post => {
    return (
        <View style={styles.feedItem}>
            <Image source={post.avatar} style={styles.avatar} />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Text style={styles.name}>{post.name}</Text>
                        <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                    </View>

                    <Ionicons name="ios-more" size={24} color="#73788B" />
                </View>
                <Text style={styles.post}>{post.text}</Text>
                <Image source={post.image} style={styles.postImage} resizeMode="cover" />
                <View style={{ flexDirection: "row" }}>
                    <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{ marginRight: 16 }} />
                    <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
                </View>
            </View>
    
        </View>
    );
};

  renderTap() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.tab}>Catigories</Text>
        <Text style={styles.tab}>Cardiology</Text>
        <Text style={styles.tab}>Oncology</Text>
        <Text style={styles.tab}>Dentist</Text>
        <Text style={styles.tab}>Ophthalmology</Text>
      </View>
    )
  }


  render() {
    return (
      <View style={styles.logout}>
        <View style={{marginHorizontal: 15, top: 32}}>

          <View style={{flexDirection: 'row'}}>
            <Ionicons name='ios-pin' size={20} style={styles.location}/>
            <Text style={{fontSize: 15}} style={styles.location}> Set Location</Text>
            <View style={styles.search}>
              <Ionicons name='ios-search' size={25} style={styles.search}  />
            </View>
          </View>
          <View style={{marginTop: 32}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>Browse</Text>
          </View>

          <View style={{marginTop: 20}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                {this.renderTap()}
              </View>
            </ScrollView>
              <Divider style={{marginTop: 10}} />
          </View>
              <Text style={{fontSize: 18, fontWeight: 'bold', top: 20}}>Nearby</Text>
              <Text style={styles.seeAll}>See all ></Text>
        <View style={styles.filter}>
          <Text style={styles.chield}>Top</Text>
          <Text style={styles.chield}>Sort</Text>
          <Text style={styles.chield}>Filter</Text>
        </View>
        </View>
          <FlatList
            style={styles.feed}
            data={posts}
            renderItem={({ item }) => this.renderPost(item)}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          ></FlatList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logout: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  search: {
    flex: 1,
    textAlign: 'right',
  },
  location: {
    flexDirection: 'row',
    textAlign: 'left',
  },
  tab: {
    backgroundColor: 'rgb(243, 240, 240)',
    paddingVertical: 7,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginRight: 7,
  },
  seeAll: {
    textAlign: 'right',
    color: '#006fff'
  },
  filter: {
    flexDirection: 'row', 
    borderWidth: .5, 
    marginTop: 15, 
    height: 38, 
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f5f5f5'
  },
  chield: {
    flex: 1,
    marginRight: 15,
    textAlign: 'center'
  },
  feed: {
    marginHorizontal: 16,
    marginTop: 40
  },
  feedItem: {
      backgroundColor: "#FFF",
      borderRadius: 5,
      padding: 8,
      flexDirection: "row",
      marginVertical: 8
  },
  avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 16
  },
  name: {
      fontSize: 15,
      fontWeight: "500",
      color: "#454D65"
  },
  timestamp: {
      fontSize: 11,
      color: "#C4C6CE",
      marginTop: 4
  },
  post: {
      marginTop: 16,
      fontSize: 14,
      color: "#838899"
  },
  postImage: {
      width: undefined,
      height: 150,
      borderRadius: 5,
      marginVertical: 16
  }
})
