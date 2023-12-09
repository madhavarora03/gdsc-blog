const Page = () => {
  const url = process.env.VERCEL_URL;
  return (
    <div>{url}</div>
  )
}
export default Page