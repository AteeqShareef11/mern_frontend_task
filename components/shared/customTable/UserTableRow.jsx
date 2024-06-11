/* eslint-disable @next/next/no-img-element */

import PropTypes from "prop-types";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

function isVideoUrl(url) {
  const videoExtensions = [
    ".mp4",
    ".webm",
    ".mkv",
    ".avi",
    ".mov",
    ".wmv",
    ".flv",
    ".mpeg",
  ];
  const fileExtension = url?.split(".")?.pop()?.toLowerCase();
  return videoExtensions?.includes(`.${fileExtension}`);
}

const regex = /\.(mp4|avi|mkv|mov|wmv|flv|png|jpg|jpeg|gif|bmp)$/i;

export default function UserTableRow({ data }) {
  if (!data) {
    return null;
  }
  return (
    <TableRow tabIndex={-1} key={data.id}>
      {Object.entries(data)?.map(([key, value]) => {
        const displayContent = () => {
          if (value === undefined) return null;
          const valueString = value?.toString();
          if (regex.test(valueString)) {
            return isVideoUrl(valueString) ? (
              <video width="150px" height="150px" controls src={value} />
            ) : (
              <img
                width="150px"
                height="150px"
                style={{ borderRadius: "100%" }}
                src={value}
                alt=""
              />
            );
          }

          return value;
        };
        return (
          <TableCell
            sx={{ cursor: "pointer" }}
            key={key}
            component="th"
            scope="row"
          >
            <Typography variant="subtitle2" noWrap>
              {displayContent()}
            </Typography>
          </TableCell>
        );
      })}
    </TableRow>
  );
}

UserTableRow.propTypes = {
  data: PropTypes.object,
};
