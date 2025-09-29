import useSWR from "swr";
import styles from "./status.module.css";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <div className={styles.container}>
      <h1>Status Page</h1>
      <div className={styles.section}>
        <UpdatedAt />
      </div>

      <h1>Database</h1>
      <div className={styles.section}>
        <DatabaseStatus />
      </div>
    </div>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let databaseStatusText = "Carregando...";

  if (!isLoading && data) {
    databaseStatusText = data.dependencies.database;
  }

  return (
    <>
      <h1>Database</h1>
      {isLoading && !data ? (
        <p>{databaseStatusText}</p>
      ) : (
        <div className={styles.databaseStatus}>
          <p>Versão: {databaseStatusText.version}</p>
          <p>Conexões usadas: {databaseStatusText.used_conn}</p>
          <p>Conexões máximas: {databaseStatusText.max_conn}</p>
        </div>
      )}
    </>
  );
}
