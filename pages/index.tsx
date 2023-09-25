import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useQuery } from "@tanstack/react-query"
import { Suspense } from "react"

function Home() {
  if (typeof window === "undefined") {
    throw Error("I don't want Suspense on SSR")
  }
  console.log("render Home")
  const query = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return `Hello!`
    },
    suspense: true,
  })
  return <h1>{query.data}</h1>
}
export default function Page() {
  return (
    <Suspense fallback={"Loading in home..."}>
      <Home />
    </Suspense>
  )
}
