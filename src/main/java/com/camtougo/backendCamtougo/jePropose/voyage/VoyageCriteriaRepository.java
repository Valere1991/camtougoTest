package com.camtougo.backendCamtougo.jePropose.voyage;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class VoyageCriteriaRepository {

    private final EntityManager entityManager;
    private final CriteriaBuilder criteriaBuilder;

    public VoyageCriteriaRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.criteriaBuilder = entityManager.getCriteriaBuilder();
    }

    public Page<VoyageRequest> findAllWithFilters(VoyageRequestPage voyageRequestPage,
                                                  VoyageSearchCriteria voyageSearchCriteria){
        CriteriaQuery<VoyageRequest> criteriaQuery = criteriaBuilder.createQuery(VoyageRequest.class);
        Root<VoyageRequest> voyageRoot = criteriaQuery.from(VoyageRequest.class);
        Predicate predicate = getPredicate(voyageSearchCriteria, voyageRoot);
        criteriaQuery.where(predicate);
        setOrder(voyageRequestPage, criteriaQuery, voyageRoot);

        TypedQuery<VoyageRequest> typedQuery = entityManager.createQuery(criteriaQuery);
        typedQuery.setFirstResult(voyageRequestPage.getPageNumber() * voyageRequestPage.getPageSize());
        typedQuery.setMaxResults(voyageRequestPage.getPageSize());

        Pageable pageable = getPageable(voyageRequestPage);

        long voyagesCount = getVoyageCount(predicate);

        return new PageImpl<>(typedQuery.getResultList(), pageable, voyagesCount);

    }

    private Predicate getPredicate(VoyageSearchCriteria voyageSearchCriteria,
                                   Root<VoyageRequest> voyageRoot) {
        List<Predicate> predicates = new ArrayList<>();
        if(Objects.nonNull(voyageSearchCriteria.getStartCity())) {
            predicates.add(
                    criteriaBuilder.like(voyageRoot.get("travelDate"), "%" + voyageSearchCriteria.getStartCity() + "%")
            );
        }
        if(Objects.nonNull(voyageSearchCriteria.getTravelDate())) {
            predicates.add(
                    criteriaBuilder.like(voyageRoot.get("travelDate"), "%" + voyageSearchCriteria.getTravelDate() + "%")
            );
        }
        if(Objects.nonNull(voyageSearchCriteria.getEndCity())) {
            predicates.add(
                    criteriaBuilder.like(voyageRoot.get("endCity"), "%" + voyageSearchCriteria.getEndCity() + "%")
            );
        }
        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }

    private void setOrder(VoyageRequestPage voyageRequestPage,
                          CriteriaQuery<VoyageRequest> criteriaQuery,
                          Root<VoyageRequest> voyageRoot) {
        if(voyageRequestPage.getSortDirection().equals(Sort.Direction.ASC)) {
            criteriaQuery.orderBy(criteriaBuilder.desc(voyageRoot.get(voyageRequestPage.getSortBy())));
        } else {
            criteriaQuery.orderBy(criteriaBuilder.asc(voyageRoot.get(voyageRequestPage.getSortBy())));
        }
    }

    private Pageable getPageable(VoyageRequestPage voyageRequestPage) {
        Sort sort = Sort.by(voyageRequestPage.getSortDirection(), voyageRequestPage.getSortBy());
        return PageRequest.of(voyageRequestPage.getPageNumber(), voyageRequestPage.getPageSize(), sort);
    }

    private long getVoyageCount(Predicate predicate) {
        CriteriaQuery<Long> counQuery = criteriaBuilder.createQuery(Long.class);
        Root<VoyageRequest> countRoot = counQuery.from(VoyageRequest.class);
        counQuery.select(criteriaBuilder.count(countRoot)).where(predicate);
        return entityManager.createQuery(counQuery).getSingleResult();
    }
}
