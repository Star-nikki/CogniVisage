import winston from "winston";

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp(),
    printf(
      ({ level, message, timestamp }) => `${timestamp} [${level}] ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
