export default function AvaterWithMessage({ message, color }) {
  return (
    <div className="avatar-message-wrapper">
      {/* Avatar */}
      <div className="avatar-circle" style={{ backgroundColor: color }}>
        {message.sender.charAt(0).toUpperCase()}
      </div>

      {/* Right Side */}
      <div className="message-content">
        <p className="sender-name">{message.sender}</p>
        <p className="message-text">{message.content}</p>
      </div>
    </div>
  );
}
