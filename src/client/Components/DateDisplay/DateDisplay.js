import moment from "moment";

export const TimeAgo = ({ children, className }) => (
  <span className={className}>{moment(children).fromNow()}</span>
);

export const FormattedDate = ({ children, format, className }) => (
  <span className={className}>{moment(children).format(format)}</span>
);
