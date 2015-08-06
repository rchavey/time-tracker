package net.chavey.timetracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.EmptySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.stereotype.Repository;

@Repository
public class TimeRepository {

    @Autowired
    private NamedParameterJdbcOperations jdbcOperations;

    public Long getTotalElapsedSeconds() {

        String sql = "select sum(elapsed_seconds) from encounter";
        return jdbcOperations.queryForObject(sql, EmptySqlParameterSource.INSTANCE, Long.class);
    }
}
