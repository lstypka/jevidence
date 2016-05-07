package pl.lstypka.jevidence.mapper;

import java.util.List;

public interface Mapper<FROM, TO> {

    TO map(FROM from);

    List<TO> map(List<FROM> from);
}
