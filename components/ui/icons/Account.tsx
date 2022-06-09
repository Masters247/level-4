const Account = ({ styles, fill }: { styles?: any; fill?: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      className={styles}
      viewBox="0 0 30 30"
    >
      <path
        d="M18,18a6.75,6.75,0,1,0-6.75-6.75A6.77,6.77,0,0,0,18,18Zm0,3.375c-4.472,0-13.5,2.278-13.5,6.75V31.5h27V28.125C31.5,23.653,22.472,21.375,18,21.375Z"
        transform="translate(-3 -3)"
        fill={fill ? "#000" : "none"}
        stroke="#000"
        strokeWidth="3"
      />
    </svg>
  );
};

export default Account;
