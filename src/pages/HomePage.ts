import AppButton from "../components/app-button/AppButton";

export default async function HomePage() {
  return `<h1>Welcome to the Home Page</h1><div>${AppButton({
    text: "Hello WORLD",
  })}</div>`;
}
