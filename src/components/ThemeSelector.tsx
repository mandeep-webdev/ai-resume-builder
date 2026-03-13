import { useFormikContext } from "formik";

const ThemeSelector = () => {
  const { setFieldValue, values } = useFormikContext<any>();

  const themes = ["blue", "green", "purple", "dark"];

  return (
    <div className="flex gap-4 mt-6">
      {themes.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setFieldValue("theme", t)}
          className={`w-8 h-8 rounded-full border-2 ${
            values.theme === t ? "border-black" : "border-gray-300"
          } ${
            t === "blue"
              ? "bg-blue-600"
              : t === "green"
                ? "bg-green-600"
                : t === "purple"
                  ? "bg-purple-600"
                  : "bg-gray-900"
          }`}
        />
      ))}
    </div>
  );
};
export default ThemeSelector;
