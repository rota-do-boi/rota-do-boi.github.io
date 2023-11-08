interface obj {
  type: string;
}

export function Icon({ type }: obj) {
  if (type == "meat") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="none"
        viewBox="0 0 36 36"
      >
        <path
          stroke="#323232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M30.804 8.528a14.875 14.875 0 0 0-15.977-.401 27.247 27.247 0 0 1-9.661 3.358l-.215.035a2.343 2.343 0 0 0-1.957 2.311v0a2.325 2.325 0 0 0 .737 1.72c7.702 6.995 19.338 7.376 27.481.9a4.868 4.868 0 0 0 1.794-3.81v0a4.972 4.972 0 0 0-2.202-4.113Z"
          clipRule="evenodd"
        />
        <path
          stroke="#323232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m23.402 11.847-1.8 4.502M17.4 11.847l-1.801 4.502M2.994 13.831v7.214a6.082 6.082 0 0 0 2.524 4.905 21.236 21.236 0 0 0 24.964 0 6.082 6.082 0 0 0 2.524-4.905V12.64"
        />
      </svg>
    );
  } else if (type == "kits") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 32 32"
      >
        <path
          stroke="#323232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13.333 9.333H16A2.667 2.667 0 0 1 18.667 12v13.333A2.667 2.667 0 0 1 16 28H5.333a2.667 2.667 0 0 1-2.666-2.667V12a2.667 2.667 0 0 1 2.666-2.667H8l-.274-1.952A2.969 2.969 0 0 1 10.666 4v0a2.969 2.969 0 0 1 2.94 3.38l-.273 1.953Z"
          clipRule="evenodd"
        />
        <path
          stroke="#323232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M29.318 18.411 29.333 20h-6a.667.667 0 0 1-.666-.667v-4.247C22.667 8.963 25.645 4 29.318 4l.015.015L29.321 4v16"
        />
        <path
          stroke="#323232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M25.333 20h4v6a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v-6Z"
          clipRule="evenodd"
        />
      </svg>
    );
  } else if (type == "accessories") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 32 32"
      >
        <path
          stroke="#0D0D0D"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".87"
          strokeWidth="1.5"
          d="m4.392 20.989 9.931-9.932a1.333 1.333 0 0 1 1.886 0l4.724 4.724c.33.32.468.79.364 1.238a16.037 16.037 0 0 1-10.943 10.944 1.303 1.303 0 0 1-1.234-.36l-4.73-4.731a1.33 1.33 0 0 1 .002-1.883Z"
          clipRule="evenodd"
        />
        <path
          stroke="#0D0D0D"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".87"
          strokeWidth="1.5"
          d="M18.483 13.331 24.4 8.564a2.506 2.506 0 0 0 .2-3.723v0m0-.001v0a2.87 2.87 0 0 0-4.06 0l-6.217 6.217"
        />
      </svg>
    );
  } else if (type == "condiment") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 32 32"
      >
        <path
          stroke="#0D0D0D"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".87"
          strokeWidth="1.5"
          d="M13.333 28H8a4 4 0 0 1-3.975-4.442l.732-6.593A3.333 3.333 0 0 1 8.07 14h5.193a3.333 3.333 0 0 1 3.313 2.965l.732 6.593A4 4 0 0 1 13.333 28Z"
          clipRule="evenodd"
        />
        <path
          stroke="#0D0D0D"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".87"
          strokeWidth="1.5"
          d="M15.333 14.722v-2.055A4.667 4.667 0 0 0 10.667 8v0A4.667 4.667 0 0 0 6 12.667v2.055"
        />
        <path
          stroke="#0D0D0D"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".87"
          strokeWidth="1.5"
          d="m15.333 13.783.091-.818A3.333 3.333 0 0 1 18.737 10h5.193a3.333 3.333 0 0 1 3.313 2.965l.732 6.593A4 4 0 0 1 23.999 24h-5.332"
        />
        <path
          stroke="#0D0D0D"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".87"
          strokeWidth="1.5"
          d="M26 10.722V8.667A4.667 4.667 0 0 0 21.333 4v0a4.667 4.667 0 0 0-4.666 4.667v2.055m2 13.278a3.718 3.718 0 0 1-1.347-.24"
        />
        <path
          stroke="#0D0D0D"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".87"
          strokeWidth="1.5"
          d="M18.667 24a3.718 3.718 0 0 1-1.347-.24"
        />
      </svg>
    );
  } else if (type == "other") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        fill="none"
        viewBox="0 0 34 34"
      >
        <path
          stroke="#0D0D0D"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".87"
          strokeWidth="1.5"
          d="M29.005 19.668v2.668a6.67 6.67 0 0 1-6.67 6.669h-10.67a6.67 6.67 0 0 1-6.67-6.67v-10.67a6.67 6.67 0 0 1 6.67-6.67h2.667"
        />
        <path
          stroke="#0D0D0D"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".87"
          strokeWidth="1.5"
          d="M22.336 4.995a6.67 6.67 0 1 1 0 13.339 6.67 6.67 0 0 1 0-13.339"
        />
        <path
          stroke="#0D0D0D"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".87"
          strokeWidth="1.5"
          d="M24.147 11.59a.072.072 0 0 0-.077.075.075.075 0 1 0 .073-.075m-3.619 0a.075.075 0 1 0 .004 0"
        />
      </svg>
    );
  } else {
    return <></>;
  }
}
