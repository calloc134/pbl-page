import { css } from "src/lib/styled-system/css";
import * as Table from "src/components/Table";
import { useParams } from "@tanstack/react-router";
import { useAllAttendanceByLessonFetch } from "../hooks/useAllAttendanceByLessonFetch";

const AllAttendanceByLesson = () => {
  const { lessonUuid } = useParams({
    from: "/teacher/auth/lessons/$lessonUuid/attendances",
  });

  const { data } = useAllAttendanceByLessonFetch(lessonUuid);

  if (data === undefined) {
    return <div className={css({ fontSize: 16, padding: 4 })}>Loading...</div>;
  }

  const attendances = data;

  return (
    <div
      className={css({
        padding: 4,
        width: "100%", // Set the width to 60% of the screen size
        maxWidth: 1200, // Limit the width to 400px
        margin: "0 auto", // Center align the card
        border: "1px solid black", // Add a black border to the card
        borderRadius: 8, // Add rounded corners to the card
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      <h2 className={css({ marginBottom: 16 })}>
        <span className={css({ fontWeight: "bold", fontSize: 32 })}>
          出席一覧
        </span>
      </h2>
      <div className={css({ marginBottom: 16 })}>
        <Table.Root>
          <Table.Table>
            <Table.Body>
              {attendances.map((attendance) => {
                return (
                  <Table.Row key={attendance.student.student_uuid}>
                    <Table.Cell>{attendance.student.name}</Table.Cell>
                    <Table.Cell>
                      {attendance.status === 1 ? "出席" : "欠席"}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Table>
        </Table.Root>
      </div>
    </div>
  );
};

export { AllAttendanceByLesson };
