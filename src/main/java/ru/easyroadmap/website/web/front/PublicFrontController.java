package ru.easyroadmap.website.web.front;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.easyroadmap.website.exception.GenericErrorException;
import ru.easyroadmap.website.web.front.service.PublicFrontService;

import java.util.UUID;

@Controller
@RequestMapping("/p")
@RequiredArgsConstructor
public class PublicFrontController {

    private final PublicFrontService publicFrontService;

    @GetMapping({
            "/{ws_id}",
            "/{ws_id}/projects"
    })
    public String workspacePage(@PathVariable(name = "ws_id") UUID workspaceId) throws GenericErrorException {
        publicFrontService.requireWorkspaceExistance(workspaceId);
        return "front";
    }

    @GetMapping("/{ws_id}/{pr_id}")
    public String projectPage(@PathVariable(name = "ws_id") UUID workspaceId, @PathVariable(name = "pr_id") UUID projectId) throws GenericErrorException {
        publicFrontService.requireProjectExistance(workspaceId, projectId);
        return "front";
    }

}
