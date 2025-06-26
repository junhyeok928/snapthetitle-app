// AttachmentRepository.java
package com.snapthetitle.backend.repository;

import com.snapthetitle.backend.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    List<Attachment> findByEntityTypeAndEntityIdAndDeletedYn(String entityType, Long entityId, String deletedYn);

    List<Attachment> findByEntityTypeAndEntityIdAndIsThumbnailTrue(String entityType, Long entityId);
}
