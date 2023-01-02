import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {data, getData, writeData} from './utils/db-service';

const App = () => {
  // Load data
  const [index, setIndex] = useState(1); // Lazy hack cause I don't want to make a datastore for this example
  const [myData, setMyData] = useState<data[]>();
  useEffect(() => {
    (async () => {
      var d = await getData();
      setMyData(d);
      setIndex(d[d.length - 1].id + 1);
    })();
  }, [index]);

  // Await load data
  if (!myData) {
    return (
      <View>
        <Text>Not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Button
            title="Add data"
            onPress={() => {
              writeData(index);
              setIndex(index + 1);
            }}
          />
          {myData.map(item => (
            <Text key={item.id}>{item.data}</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
