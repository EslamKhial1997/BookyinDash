import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/react";
import * as FiIcons from "react-icons/fi";

import SharedTable from "../../shared/table/Table";
import theme from "../../global/theme";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getContent } from "@/store/content/contentSlice";

const Table = ({ data, page, handleDelete, handleUpdate }) => {
  const { t } = useTranslation();
const params = useParams()
const dispatch = useDispatch()
console.log(params.id);
useEffect(() => {
  dispatch(getContent({id: params}));
}, [dispatch]);
  return (
    <SharedTable>
      <thead>
        <tr>
          <th>#</th>
          <th>{t("Title")}</th>
          <th>{t("SubTitle")}</th>
          <th>{t("Image")}</th>
          <th>{t("Logo")}</th>
          <th>{t("general.action")}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((el) =>
          el === undefined ? (
            ""
          ) : (
            <tr key={el._id}>
              <td>{el._id}</td>
              <td>{el.title || "-"}</td>
              <td>{el.subtitle || "-"}</td>
              <td>
                <img
                  src={el.image || "-"}
                  style={{ width: "50px", margin: "auto" }}
                />
              </td>
              <td>
                <img
                  src={el.logo || "-"}
                  style={{ width: "50px", margin: "auto" }}
                />
              </td>

              <td>
                
                  {" "}
                  <Button
                    bg={theme.success}
                    color={theme.light}
                    size="sm"
                    me={2}
                    borderRadius={2}
                    onClick={() => handleUpdate(el)}
                  >
                    <FiIcons.FiEdit size={18} />
                  </Button>
               
                <Button
                  bg={theme.error}
                  color={theme.light}
                  size="sm"
                  onClick={() => handleDelete(el)}
                  me={2}
                  borderRadius={2}
                >
                  <FiIcons.FiEdit size={18} />
                </Button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </SharedTable>
  );
};

export default Table;
