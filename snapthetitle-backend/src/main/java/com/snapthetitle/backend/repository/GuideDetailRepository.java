// GuideDetailRepository.java
package com.snapthetitle.backend.repository;

import com.snapthetitle.backend.entity.GuideDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GuideDetailRepository extends JpaRepository<GuideDetail, Long> {
    List<GuideDetail> findByGuideIdAndDeletedYnOrderByDisplayOrderAsc(Long guideId, String deletedYn);
}
