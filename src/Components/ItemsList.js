import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { db } from "./FireBaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function ItemListPages({ user }) {
  const [watchlist, setWatchList] = useState([]);
  const [pagination, setPagination] = useState({
    data: new Array(100).fill().map((value, index) => ({
      title: faker.commerce.product(),
    })),
    offset: 0,
    numberPerPage: 6,
    pageCount: 0,
    currentData: [],
  });
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: Math.ceil(prevState.data.length / prevState.numberPerPage),
      currentData: prevState.data.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
    getSelectedList();
  }, [pagination.numberPerPage, pagination.offset]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  const getSelectedList = async () => {
    setWatchList([]);
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "e-commerce"), where("email", "==", user.email))
      );
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setWatchList(newData);

      // Update checked items state
      const newCheckedItems = {};
      newData.forEach((item) => {
        newCheckedItems[item.title] = true;
      });
      setCheckedItems(newCheckedItems);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const toggleItem = async (item) => {
    try {
      const existingData = watchlist;
      const isItemInList = existingData.some((val) => val.title === item.title);

      if (!isItemInList) {
        await addDoc(collection(db, "e-commerce"), {
          email: user.email,
          title: item.title,
        });
      } else {
        existingData.forEach(async (list) => {
          if (list.title === item.title) {
            await deleteDoc(doc(db, "e-commerce", list.id));
          }
        });
      }

      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [item.title]: !prevCheckedItems[item.title],
      }));
    } catch (error) {
      console.error("Error toggling item:", error);
    }
  };

  return (
    <div className="Item">
      <h1>Please mark your Interest</h1>
      <div>We will keep notified</div>
      {pagination.currentData.map((item, index) => (
        <div key={index} className="post">
          <input
            type="checkbox"
            name="item"
            value={item.id}
            checked={checkedItems[item.title] || false}
            onChange={() => toggleItem(item)}
          />
          <h3>{item.title}</h3>
        </div>
      ))}
      <ReactPaginate
        previousLabel={"⏪"}
        nextLabel={"⏩"}
        breakLabel={"..."}
        pageCount={pagination.pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
      />
    </div>
  );
}
