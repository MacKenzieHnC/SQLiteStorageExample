import SQLite from 'react-native-sqlite-storage';

/* 
    NOTE: Every time you replace the db, you have to 
    -Android: manually uninstall the app from the device
    -Windows: manually delete from C:\Users\<UserName>\AppData\Local\Packages\<PackageCode>\LocalState\ 
*/
export const getDBConnection = async () => {
  return SQLite.openDatabase(
    {
      name: 'test.db',
      location: 'default',
      createFromLocation: '1',
    },
    () => console.log('Success!'),
    e => console.log(e.message),
  );
};

SQLite.enablePromise(true);

export interface data {
  id: number;
  data: string;
}

export const getData = async () => {
  const db = await getDBConnection();

  const items: data[] = [];
  try {
    const query = `SELECT *
    FROM my_table`;

    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({
          id: item.id,
          data: item.my_column,
        });
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  } finally {
    db.close();
  }
};

export const writeData = async (index: number) => {
  const db = await getDBConnection();

  try {
    const query = `INSERT INTO my_table (id, my_column)
    VALUES (${index}, "Behold! I am even more data!")`;

    const results = await db.executeSql(query);
    console.log(results);
  } catch (error) {
    console.error(error);
    throw Error('Failed to write items !!!');
  } finally {
    db.close();
  }
};
