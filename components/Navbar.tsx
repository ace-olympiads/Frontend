import { GetSessionParams, getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import search from "../public/assets/search.png";
import home from "../public/assets/home.png";
import styles from "../styles/Navbar.module.css";
import userImg from "../public/assets/userImg.png";
import { User } from "../types";
import Link from "next/link";
import { useState, useEffect, useLayoutEffect } from "react";
import axiosInstance from "../pages/api/axios";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const [currUser, setCurrUser] = useState<User>();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      window.addEventListener("resize", () => setIsNavExpanded(false));
    }
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <nav className={styles["navigation"]}>
      <Link href="/" className={styles["brand-name"]}>
        ACEOLYMPIADS
      </Link>
      <button
        className={styles["hamburger"]}
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded
            ? styles["navigation-menu-expanded"]
            : styles["navigation-menu"]
        }
      >
        <ul onClick={() => setIsNavExpanded(false)}>
          <li>
            <Link href="/examination">
              <button>Examinations</button>
            </Link>
          </li>
          <li>
            {session.data?.user ? (
              <></>
            ) : (
              <>
                {" "}
                <button
                  onClick={() => router.push("/auth")}
                  className={styles["signup"]}
                >
                  Signup
                </button>
                <button
                  onClick={() => router.push("/auth")}
                  className={styles["login"]}
                >
                  Login
                </button>
              </>
            )}
          </li>
          <li>
            <button
              onClick={() => router.push("/search")}
              className={styles["search"]}
            >
              <Image src={search} alt="" />
            </button>
          </li>
          <li
            style={{
              display: "flex",
              justifyContent: "space-between",
              columnGap: 20,
            }}
          >
            {session.data?.user ? (
              <>
                <div className={styles["profile-image"]}>
                  {session?.data?.user?.image ? (
                    <Image
                      src={session?.data?.user?.image}
                      alt=""
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Image src={userImg} alt="" width={40} height={40} />
                  )}
                </div>
                <p>
                  Currently logged in as{" "}
                  {session.data.user.name
                    ? session.data.user.name
                    : session.data.user.email}
                </p>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className={styles["login"]}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <></>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
