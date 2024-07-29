import { useState, useRef, useEffect } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<
    { text: string | JSX.Element; type: string }[]
  >([]);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnter = () => {
    let newOutput = null;
    let type = "default";
    const timestamp = new Date().toLocaleTimeString();

    switch (input.trim().toLowerCase()) {
      case "help":
        newOutput = (
          <div>
            <strong>List of commands:</strong>
            <ul className="list-inside list-disc ml-5">
              <li>
                <strong>help:</strong> shows all available commands.
              </li>
              <li>
                <strong>about:</strong> see info about me.
              </li>
              <li>
                <strong>cv:</strong> get a link to my cv.
              </li>
              <li>
                <strong>contact:</strong> view my contact information.
              </li>
              <li>
                <strong>projects:</strong> view my projects.
              </li>
              <li>
                <strong>clear:</strong> clear the terminal
              </li>
            </ul>
          </div>
        );
        type = "help";
        break;
      case "about":
        newOutput = "Lorem ipsum ";
        type = "about";
        break;
      case "cv":
        newOutput = "Lorem ";
        type = "cv";
        break;
      case "contact":
        newOutput = "Lorem ";
        type = "contact";
        break;
      case "projects":
        newOutput = "Lorem ";
        type = "projects";
        break;
      case "clear":
        setOutput([]);
        setInput("");
        return;
      default:
        newOutput = "Unknown command. type help to see all available commands.";
        type = "error";
    }

    setOutput((prevOutput) => [
      ...prevOutput,
      { text: `${timestamp} ----------- ${input}`, type: "command" },
      { text: newOutput, type },
    ]);
    setInput("");
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="h-full min-h-[100svh] w-full bg-black text-[#33cc33] pl-3.5">
      <div className="head">
        <h1 className="text-6xl font-mono">welcome</h1>
        <p className="italic">type help to list of commands</p>
      </div>
      <div
        ref={outputRef}
        className="output mt-5 whitespace-pre-line overflow-y-auto no-scrollbar"
        style={{ maxHeight: "80vh" }}
      >
        {output.map((line, index) => (
          <div
            key={index}
            style={{ marginBottom: "0.5rem" }}
            className={getClassByType(line.type)}
          >
            {typeof line.text === "string" ? line.text : line.text}
          </div>
        ))}
      </div>
      <div className="input relative mt-5">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-4xl">
          &#8212;&#187;
        </span>
        <input
          ref={inputRef}
          className="bg-transparent focus:outline-none text-white pl-[3.5rem]"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEnter()}
        />
      </div>
    </div>
  );
}

function getClassByType(type: string) {
  switch (type) {
    case "help":
      return "text-yellow-500";
    case "about":
      return "text-blue-500";
    case "cv":
      return "text-green-500";
    case "contact":
      return "text-purple-500";
    case "projects":
      return "text-pink-500";
    case "error":
      return "text-red-500";
    case "command":
      return "text-gray-500";
    default:
      return "text-white";
  }
}
