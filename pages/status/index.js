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
    <div>
      Versão: {databaseStatusText.version} <br />
      Conexões usadas: {databaseStatusText.used_conn} <br />
      Conexões máximas: {databaseStatusText.max_conn} <br />
    </div>
  );
}
