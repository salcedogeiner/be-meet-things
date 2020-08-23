CREATE TABLE user_role
(
    id integer NOT NULL,
    name character varying NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

CREATE TABLE user_info
(
    uid character varying  NOT NULL,
    name character varying  NOT NULL,
    email character varying  NOT NULL,
    role_id integer NOT NULL,
    CONSTRAINT user_info_id_pk PRIMARY KEY (uid),
	CONSTRAINT user_role_fk FOREIGN KEY (role_id)
        REFERENCES user_role (id) MATCH FULL
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);